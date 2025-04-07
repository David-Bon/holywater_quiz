import { useParams } from 'react-router';

import downloadIcon from '../../assets/download.png';
import { downloadCsvFromLocalStorage } from '../../utils/downloadCsvFromLocalStorage.ts';

export const DownloadButton = () => {
    const { quizId } = useParams();

    return (
        <button
            className="flex items-center justify-center cursor-pointer"
            onClick={() => downloadCsvFromLocalStorage(quizId as string)}
        >
            <img width={42} height={42} src={downloadIcon} alt="" />
            <span>Download my answers</span>
        </button>
    );
};
