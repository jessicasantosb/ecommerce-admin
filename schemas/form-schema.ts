import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
});

export const billboardFormSchema = z.object({
  label: z.string().min(1, { message: 'O nome é obrigatório' }),
  imageUrl: z.string().min(1, { message: 'A imagem é obrigatória' }),
});

export const categoryFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  billboardId: z.string().min(1, { message: 'O id do painel é obrigatório' }),
});

export const sizeFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  value: z.string().min(1, { message: 'O tamanho é obrigatório' }),
});

export const colorFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  value: z
    .string()
    .min(4, { message: 'A cor fornecida não é um código hexadecimal válido' })
    .regex(/^#/, {
      message: 'A cor fornecida não é um código hexadecimal válido',
    }),
});

export const productFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  images: z
    .object({ url: z.string().nonempty('A url é obrigatória') })
    .array()
    .nonempty('É necessário fornecer pelo menos uma imagem'),
  price: z.coerce
    .number({ message: 'Digite um número válido' })
    .min(1, { message: 'O preço é obrigatório' }),
  categoryId: z.string().min(1, { message: 'A categoria é obrigatória' }),
  colorId: z.string().min(1, { message: 'A cor é obrigatória' }),
  sizeId: z.string().min(1, { message: 'O tamanho é obrigatório' }),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});
