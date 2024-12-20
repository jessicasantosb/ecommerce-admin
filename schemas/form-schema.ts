import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
});

export const billboardFormSchema = z.object({
  label: z.string().min(1, { message: 'O nome é obrigatório' }),
  imageUrl: z.string().min(1, { message: 'A imagem é obrigatória' }),
});
