import { Content } from 'pdfmake/interfaces';

export const getFooterSection = (
  currentPage: number,
  pageCount: number,
): Content => {
  return {
    text: `Page ${currentPage} of ${pageCount}`,
    bold: true,
    alignment: 'right',
    margin: [0, 10, 35, 0],
  };
};
