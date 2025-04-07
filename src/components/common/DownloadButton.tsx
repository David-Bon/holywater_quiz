import { useParams } from 'react-router';

import downloadIcon from '../../assets/download.png';
import { downloadCsvFromLocalStorage } from '../../utils/downloadCsvFromLocalStorage.ts';
import { useTranslation } from 'react-i18next';

export const DownloadButton = () => {
    const { quizId } = useParams();
    const { t } = useTranslation();

    return (
        <button
            className="flex items-center justify-center cursor-pointer"
            onClick={() => downloadCsvFromLocalStorage(quizId as string)}
        >
            <img width={42} height={42} src={downloadIcon} alt="" />
            <span>{t('Download my answers')}</span>
        </button>
    );
};
