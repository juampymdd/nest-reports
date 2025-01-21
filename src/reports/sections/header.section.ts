import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers/date-formatter';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const getHeaderSection = (options: HeaderOptions): Content => {
  const { title, subtitle, showLogo, showDate } = options;
  return {
    columns: [
      showLogo ? logo : '',
      {
        text: `${DateFormatter.getDDMMMMYYYY(new Date())}`,
        alignment: 'right',
        margin: [0, 20, 20, 20],
      },
    ],
  };
};
