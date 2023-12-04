import { useEffect, useState } from 'react';

import { Container } from './styles';

import { Modal, SlideButton } from '@/components';

import { ExportPage, ImportPage } from './pages';

import { ImportExportReportModalProps } from './models';

export const ImportExportReportModal = ({
  isOpen,
  onClose,
}: ImportExportReportModalProps) => {
  const list = ['Importar', 'Exportar'];

  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentItem(0);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Importar/exportar base'>
      <Container>
        <SlideButton
          list={list}
          currentItem={currentItem}
          changeCurrentItem={setCurrentItem}
        />

        {currentItem === 0 ? (
          <ImportPage />
        ) : currentItem === 1 ? (
          <ExportPage onClose={onClose} />
        ) : null}
      </Container>
    </Modal>
  );
};
