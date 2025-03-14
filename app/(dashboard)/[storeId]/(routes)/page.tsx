import { CreditCard, DollarSign } from 'lucide-react';

import { getTotalRevenue } from '@/actions/get-total-revenue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { priceFormatter } from '@/lib/utils';

export default async function DashboardPage(
  params: Promise<{ storeId: string }>,
) {
  const { storeId } = await params;

  const totalRevenue = await getTotalRevenue(storeId);

  return (
    <main className='flex items-center'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <Heading title='Dashboard' description='Visão geral da sua loja' />
        <Separator />

        <div className='grid gap-4 grid-cols-3'>
          <Card>
            <CardHeader className='pb-2 space-y-0 flex flex-row items-center justify-between'>
              <CardTitle className='text-sm font-medium'>
                Total recebido
              </CardTitle>
              <DollarSign className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {priceFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2 space-y-0 flex flex-row items-center justify-between'>
              <CardTitle className='text-sm font-medium'>Vendas</CardTitle>
              <CreditCard className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+25</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2 space-y-0 flex flex-row items-center justify-between'>
              <CardTitle className='text-sm font-medium'>
                Produtos em estoque
              </CardTitle>
              <CreditCard className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>200</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
