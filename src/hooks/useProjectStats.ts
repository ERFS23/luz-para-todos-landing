import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProjectStats {
  totalChildrenWaiting: number;
  totalShelters: number;
  blessedChildrenCount: number;
  childrenRemaining: number;
}

export const useProjectStats = () => {
  const [stats, setStats] = useState<ProjectStats>({
    totalChildrenWaiting: 120,
    totalShelters: 3,
    blessedChildrenCount: 0,
    childrenRemaining: 120,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Get settings
      const { data: settings } = await supabase
        .from("project_settings")
        .select("key, value");

      // Get blessed children count
      const { count: blessedCount } = await supabase
        .from("blessed_children")
        .select("*", { count: "exact", head: true });

      const totalWaiting = settings?.find(s => s.key === "total_children_waiting")?.value || "120";
      const totalShelters = settings?.find(s => s.key === "total_shelters")?.value || "3";

      const total = parseInt(totalWaiting);
      const blessed = blessedCount || 0;

      setStats({
        totalChildrenWaiting: total,
        totalShelters: parseInt(totalShelters),
        blessedChildrenCount: blessed,
        childrenRemaining: total - blessed,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("stats-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "blessed_children" },
        () => fetchStats()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "project_settings" },
        () => fetchStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, loading, refetch: fetchStats };
};
