import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface IHelloWorldReport {
  name: string;
}

export const getHelloWorldReport = (
  options: IHelloWorldReport,
): TDocumentDefinitions => {
  const { name } = options;

  const docDefinition: TDocumentDefinitions = {
    content: [`Hola ${name}!`],
  };
  return docDefinition;
};
