const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionService = new SpeechRecognition();

SpeechRecognitionService.continuous = true;
SpeechRecognitionService.interimResults = true;
SpeechRecognitionService.lang = 'en-US';

export default SpeechRecognitionService;
