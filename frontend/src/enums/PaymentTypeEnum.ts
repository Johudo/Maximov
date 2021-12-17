export enum PaymentTypeEnum {
    CASH_UPON_RECEIPT = "CASH_UPON_RECEIPT",
    CARD_ONLINE = "CARD_ONLINE",
}

export const PaymentTypeEnumArray = [
    { type: PaymentTypeEnum.CARD_ONLINE, text: "Картой онлайн" },
    { type: PaymentTypeEnum.CASH_UPON_RECEIPT, text: "Наличными при получении" },
];
