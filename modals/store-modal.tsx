import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';

export function StoreModal() {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title='Criar loja'
      description='Adicione nova loja e organize seus produtos e categorias'
      isOpen={isOpen}
      onClose={onClose}>
      Futuro formulário de criação de loja
    </Modal>
  );
}
