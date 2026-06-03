CREATE POLICY "Admins update applications files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'applications' AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'applications' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete applications files"
ON storage.objects FOR DELETE
USING (bucket_id = 'applications' AND has_role(auth.uid(), 'admin'::app_role));