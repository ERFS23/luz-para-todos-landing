-- Allow anyone to delete blessed children
CREATE POLICY "Anyone can delete blessed children"
ON public.blessed_children
FOR DELETE
USING (true);