import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { DateFormatter } from "src/helpers/date-formatter"
import { getFooterSection } from "./sections/footer.section"
import { CurrencyFormatter } from "src/helpers"


const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10, 30, 0, 0]
}

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [0,0,0,30]
    }
}

export const orderByIdReport = ():TDocumentDefinitions => {

    return {
        styles: styles,
        header: logo,
        footer: getFooterSection,
        pageMargins: [40, 60, 40, 60],
        content: [
            // Headers
            { text: "Tucan Code", style: 'header' },
            // Dirección y recibos
            { columns: [
                { text: `15 Montgomery Str, Suite 100
                            Ottawa ON K2Y 9X1, CANADA
                            BN: 12783671823
                            https://devtalles.com`  },
                { text: [{text:`Order ID: 123456 \n`, bold: true},
                     `Fecha del recibo ${DateFormatter.getDDMMMMYYYY(new Date())}
                     pagar antes de ${DateFormatter.getDDMMMMYYYY(new Date())}`], alignment: 'right' 
                },
            ] 
        },
        {qr: 'https://devtalles.com', fit: 75, alignment: 'right'},  
        { text: [{text:`Cobrar a:`, bold: true},
        `
            Razón Social: Richter Supermarkt
            Michael Holz
            Grenzacherweg 237
            `]
        },
        {
            layout: 'headerLineOnly',
            margin: [0, 20],
            table: {
                headerRows: 1,
                widths: [50, '*', 'auto', 'auto', 'auto'],
                body: [
                    [
                        {text:'ID', bold:true},
                        {text: 'Descripción', bold: true}, 
                        {text: 'Cantidad', bold: true}, 
                        {text: 'Precio', bold: true}, 
                        {text: 'Total', bold: true}
                    ],

                    [1, 'Producto 1', 1, 10, {text: CurrencyFormatter.formatCurrency(10870), alignment: 'right'}],
                    [2, 'Producto 2', 2, 20, {text: CurrencyFormatter.formatCurrency(40), alignment: 'right'}],
                    [3, 'Producto 3', 3, 30, {text: CurrencyFormatter.formatCurrency(90), alignment: 'right'}],
                    [4, 'Producto 4', 4, 40, {text: CurrencyFormatter.formatCurrency(150), alignment: 'right'}],
                ]
            }
        },{
            columns: [
                {
                 width: '*',
                 text: ''
                },
                {
                    width: 'auto', 
                    layout: 'noBorders', 
                    table: {
                        body: [
                            ['Subtotal', {
                                text: CurrencyFormatter.formatCurrency(288), 
                                alignment: 'right'}],
                                [{text: 'Total', bold: true}, {
                                    text: CurrencyFormatter.formatCurrency(1200), 
                                    alignment: 'right',
                                    bold: true
                                }],
                            
                        ]
                    }}
            ]
            
        }

    ]
    }
}