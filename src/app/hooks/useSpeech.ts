import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import SpeechRecognitionService from 'services/SpeechRecognitionService';

export interface UseSpeechReturnProps {
    isListening: boolean;
    handleToggleListen: () => void;
    transcript: string;
    resetTranscript: () => void;
}

export default function useSpeech(): UseSpeechReturnProps {
    const { enqueueSnackbar } = useSnackbar();

    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');

    useEffect(() => {
        const handleListen = (): void => {
            if (isListening) {
                SpeechRecognitionService.start();

                SpeechRecognitionService.onend = () => {
                    SpeechRecognitionService.start();
                };
            } else {
                SpeechRecognitionService.stop();
                SpeechRecognitionService.onend = () => {
                    enqueueSnackbar('Mic is off', { variant: 'warning' });
                };
            }
            SpeechRecognitionService.onstart = () => {
                enqueueSnackbar('Mic is on', { variant: 'success' });
            };

            SpeechRecognitionService.onresult = (event: {
                results: SpeechRecognitionResultList;
            }) => {
                const transcript = Array.from(event.results)
                    .map((result) => result[0])
                    .map((result) => result.transcript)
                    .join('');

                setTranscript(transcript);

                SpeechRecognitionService.onerror = (event: { message: string }) => {
                    enqueueSnackbar(event.message, { variant: 'error' });
                };
            };
        };

        handleListen();
    }, [isListening, enqueueSnackbar]);

    const handleToggleListen = (): void => {
        setIsListening((prevState) => !prevState);
    };

    const resetTranscript = (): void => {
        SpeechRecognitionService.stop();
    };

    return {
        isListening,
        handleToggleListen,
        transcript,
        resetTranscript,
    };
}
