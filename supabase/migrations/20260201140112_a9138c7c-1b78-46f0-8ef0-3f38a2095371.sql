-- Tabela para armazenar crianças abençoadas
CREATE TABLE public.blessed_children (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  shelter_name TEXT,
  blessed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para configurações do projeto (estatísticas do Elias)
CREATE TABLE public.project_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir valores iniciais
INSERT INTO project_settings (key, value) VALUES 
  ('total_children_waiting', '120'),
  ('total_shelters', '3'),
  ('elias_age', '20'),
  ('elias_course', 'Teologia');

-- RLS para leitura pública (qualquer um pode ver as estatísticas)
ALTER TABLE public.blessed_children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública
CREATE POLICY "Public can view blessed children" 
ON public.blessed_children 
FOR SELECT 
USING (true);

CREATE POLICY "Public can view settings" 
ON public.project_settings 
FOR SELECT 
USING (true);

-- Política de inserção pública (para simplicidade, qualquer um pode adicionar)
CREATE POLICY "Anyone can add blessed children" 
ON public.blessed_children 
FOR INSERT 
WITH CHECK (true);

-- Política de update para settings
CREATE POLICY "Anyone can update settings" 
ON public.project_settings 
FOR UPDATE 
USING (true);

-- Enable realtime para atualizações ao vivo
ALTER PUBLICATION supabase_realtime ADD TABLE public.blessed_children;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_settings;