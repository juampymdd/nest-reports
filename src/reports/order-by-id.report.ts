import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { DateFormatter } from "src/helpers/date-formatter"
import { getFooterSection } from "./sections/footer.section"
import { CurrencyFormatter } from "src/helpers"

export interface OrderValue {
    order_id:      number;
    customer_id:   number;
    order_date:    Date;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        string;
}


interface ReportValues {
    title?: string;
    subtitle?: string;
    data: OrderValue;
}

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

export const orderByIdReport = (values: ReportValues):TDocumentDefinitions => {
    const {data} = values;
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
                { text: [{text:`Order ID: ${data.order_id} \n`, bold: true},
                     `Fecha del recibo ${DateFormatter.getDDMMMMYYYY(data.order_date)}
                     pagar antes de ${DateFormatter.getDDMMMMYYYY(new Date())}`], alignment: 'right' 
                },
            ] 
        },
        {qr: 'https://devtalles.com', fit: 75, alignment: 'right'},  
        { text: [{text:`Cobrar a:`, bold: true},
        `
            Razón Social: ${data.customers.customer_name}
            ${data.customers.address}
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
                    ...data.order_details.map((orderDetail) => {
                        return [
                            orderDetail.product_id,
                            orderDetail.products.product_name,
                            orderDetail.quantity,
                            {text: CurrencyFormatter.formatCurrency(+orderDetail.products.price), alignment: 'right'},
                            {text: CurrencyFormatter.formatCurrency(+orderDetail.products.price * orderDetail.quantity), alignment: 'right'}
                        ]
                    }),
                    
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
                                text: CurrencyFormatter.formatCurrency(data.order_details.reduce((acc, orderDetail) => {
                                    return acc + (+orderDetail.products.price * orderDetail.quantity)
                                    }, 0)),
                                alignment: 'right'}],
                                [{text: 'Total', bold: true}, {
                                    text: CurrencyFormatter.formatCurrency(data.order_details.reduce((acc, orderDetail) => {
                                        return acc + (+orderDetail.products.price * orderDetail.quantity)
                                    }, 0)),
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