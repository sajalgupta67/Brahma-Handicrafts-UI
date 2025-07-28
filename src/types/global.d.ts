interface UnicornStudioType {
  init: () => void;
  isInitialized?: boolean;
}

interface Window {
  UnicornStudio?: UnicornStudioType;
}