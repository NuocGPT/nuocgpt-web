import '#/configs/theme/index.less';
import { getPopupContainer } from '@enouvo/react-uikit';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import './configs/theme/index.css';
import './configs';
import { formConfig } from './configs/config';
import App from './routers/App';
import { queryClient } from './services/client';
import i18n from './shared/i18n';

createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        componentSize="large"
        form={formConfig}
        getPopupContainer={getPopupContainer}
        locale={enUS}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  </I18nextProvider>,
);
