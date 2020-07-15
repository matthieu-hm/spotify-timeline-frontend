import { Injectable } from '@angular/core';

export interface WindowPopup {
  window: Window;
  key: string;
  closeListenerIntervalId: number;
  onCloseCallback: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class WindowPopupService {

  private windows: WindowPopup[] = [];

  public get(key: string): WindowPopup {
    return this.windows.find(windowPopup => {
      return windowPopup.key === key;
    });
  }

  public open(url = '', key?: string, features?: string[], onCloseCallback?: 'clear' | (() => void)): WindowPopup {
    const windowPopupKey = key ? key : url;
    const windowPopupOpened = this.get(windowPopupKey);

    if (windowPopupOpened) {
      // There is a popup opened
      windowPopupOpened.window.location.href = url;

      if (onCloseCallback === 'clear') {
        windowPopupOpened.onCloseCallback = null;
      } else if (onCloseCallback) {
        windowPopupOpened.onCloseCallback = onCloseCallback;
      }

      return windowPopupOpened;
    }

    // There is no popup open
    const windowPopupFeatures = features ? features : [
      'width=960',
      'height=600',
      `top=${window.screenTop + 50}`,
      `left=${window.screenLeft + 50}`,
      'hidden=yes',
      'location=no',
      'zoom=no',
    ];

    const windowPopupOnClose = (onCloseCallback === 'clear') ? null : onCloseCallback;

    const windowPopup = {
      window: window.open(url, windowPopupKey, windowPopupFeatures.join(',')),
      key: windowPopupKey,
      closeListenerIntervalId: null,
      onCloseCallback: windowPopupOnClose
    };

    this.setPopupCloseListener(windowPopup, windowPopupOnClose);
  }

  private delete(key: string): void {
    this.windows = this.windows.filter(windowPopup => {
      return windowPopup.key !== key;
    });
  }

  private setPopupCloseListener(windowPopup: WindowPopup, onCloseCallback?: () => void): void {
    if (windowPopup.closeListenerIntervalId) {
      window.clearInterval(windowPopup.closeListenerIntervalId);
    }

    windowPopup.closeListenerIntervalId = window.setInterval(() => {
      if (windowPopup.window.closed) {
        window.clearInterval(windowPopup.closeListenerIntervalId);

        if (windowPopup.onCloseCallback) {
          windowPopup.onCloseCallback();
        }

        this.delete(windowPopup.key);
      }
    }, 50);
  }
}
