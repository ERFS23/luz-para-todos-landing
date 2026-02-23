import { useState, useEffect } from "react";
import { Plus, Users, Check, X, ChevronDown, ChevronUp, LogIn, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useProjectStats } from "@/hooks/useProjectStats";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

interface BlessedChild {
  id: string;
  name: string;
  age: number | null;
  shelter_name: string | null;
  blessed_at: string;
}

const AdminPanel = () => {
  const { stats, refetch } = useProjectStats();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [blessedChildren, setBlessedChildren] = useState<BlessedChild[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [newChild, setNewChild] = useState({
    name: "",
    age: "",
    shelter_name: "",
  });

  // Check admin role
  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    return !!data;
  };

  // Auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          const admin = await checkAdminRole(currentUser.id);
          setIsAdmin(admin);
        } else {
          setIsAdmin(false);
        }
        setAuthLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const admin = await checkAdminRole(currentUser.id);
        setIsAdmin(admin);
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) return;
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) {
      toast.error("Erro ao fazer login: " + error.message);
    } else {
      toast.success("Login realizado com sucesso!");
      setShowLogin(false);
      setLoginEmail("");
      setLoginPassword("");
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsExpanded(false);
    toast.success("Logout realizado");
  };

  // Don't render anything if not authenticated or not admin
  if (authLoading) return null;

  // Show login button for unauthenticated users (hidden, accessible via URL hash)
  if (!user || !isAdmin) {
    // Only show login if user navigates to #admin
    if (typeof window !== "undefined" && window.location.hash !== "#admin") {
      return null;
    }

    return (
      <div className="fixed bottom-4 right-4 z-50">
        {showLogin ? (
          <div className="w-[320px] bg-card border border-border rounded-xl shadow-2xl p-4 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-foreground">Admin Login</h3>
            <Input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <div className="flex gap-2">
              <Button onClick={handleLogin} disabled={loginLoading} className="flex-1">
                {loginLoading ? "Entrando..." : "Entrar"}
              </Button>
              <Button variant="outline" onClick={() => setShowLogin(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            {user && !isAdmin && (
              <p className="text-xs text-destructive">Usuário não tem permissão de administrador.</p>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-muted text-muted-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <LogIn className="w-5 h-5" />
            <span className="text-sm">Admin</span>
          </button>
        )}
      </div>
    );
  }

  const fetchBlessedChildren = async () => {
    setLoadingChildren(true);
    const { data, error } = await supabase
      .from("blessed_children")
      .select("*")
      .order("blessed_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar crianças");
    } else {
      setBlessedChildren(data || []);
    }
    setLoadingChildren(false);
  };

  const handleExpand = () => {
    if (!isExpanded) {
      fetchBlessedChildren();
    }
    setIsExpanded(!isExpanded);
  };

  const handleAddChild = async () => {
    if (!newChild.name.trim() || isSaving) return;

    setIsSaving(true);
    const { error } = await supabase.from("blessed_children").insert({
      name: newChild.name.trim(),
      age: newChild.age ? parseInt(newChild.age) : null,
      shelter_name: newChild.shelter_name.trim() || null,
    });

    if (error) {
      toast.error("Erro ao adicionar criança");
    } else {
      toast.success(`${newChild.name} foi abençoada! 🌟`);
      setNewChild({ name: "", age: "", shelter_name: "" });
      setIsAdding(false);
      await fetchBlessedChildren();
      refetch();
    }
    setIsSaving(false);
  };

  const handleDeleteChild = async (id: string, name: string) => {
    if (deletingId) return;

    setDeletingId(id);
    setBlessedChildren(prev => prev.filter(c => c.id !== id));

    const { error } = await supabase
      .from("blessed_children")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao remover criança");
      await fetchBlessedChildren();
    } else {
      toast.success(`${name} foi removida da lista`);
      refetch();
    }
    setDeletingId(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleExpand}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-gold to-amber text-deep-brown font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px]"
      >
        <Users className="w-5 h-5" />
        <span className="text-sm">
          <span className="font-bold">{stats.blessedChildrenCount}</span> abençoadas |
          <span className="font-bold ml-1">{stats.childrenRemaining}</span> aguardando
        </span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronUp className="w-4 h-4" />
        )}
      </button>

      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-[320px] sm:w-[380px] bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-gold/20 to-amber/20 p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Painel de Crianças
              </h3>
              <button onClick={handleLogout} className="p-1.5 rounded-full hover:bg-muted transition-colors" title="Sair">
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>{stats.blessedChildrenCount} abençoadas</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-amber" />
                <span>{stats.childrenRemaining} aguardando</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-border">
            {isAdding ? (
              <div className="space-y-3">
                <Input
                  placeholder="Nome da criança *"
                  value={newChild.name}
                  onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Idade"
                    type="number"
                    value={newChild.age}
                    onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
                    className="text-sm w-20"
                  />
                  <Input
                    placeholder="Abrigo"
                    value={newChild.shelter_name}
                    onChange={(e) => setNewChild({ ...newChild, shelter_name: e.target.value })}
                    className="text-sm flex-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddChild}
                    disabled={isSaving}
                    className="flex-1 bg-gradient-to-r from-gold to-amber text-deep-brown hover:opacity-90"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    {isSaving ? "Salvando..." : "Salvar"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAdding(false)}
                    disabled={isSaving}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setIsAdding(true)}
                className="w-full bg-gradient-to-r from-gold to-amber text-deep-brown hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Criança Abençoada
              </Button>
            )}
          </div>

          <div className="max-h-[300px] overflow-y-auto p-4">
            {loadingChildren ? (
              <p className="text-center text-muted-foreground text-sm">Carregando...</p>
            ) : blessedChildren.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm">
                Nenhuma criança abençoada ainda
              </p>
            ) : (
              <div className="space-y-2">
                {blessedChildren.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-amber/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {child.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {child.age && `${child.age} anos`}
                        {child.age && child.shelter_name && " • "}
                        {child.shelter_name}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteChild(child.id, child.name)}
                      disabled={deletingId === child.id}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all disabled:opacity-50"
                      title="Remover"
                    >
                      <X className={`w-4 h-4 ${deletingId === child.id ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
