import { isThisQuarter } from "date-fns";

class Vendita {
    constructor(idVendita, tipologiaCliente, prodotto, quantità, prezzoListino, sconto, data, supporto, funzionario, manager) {
       this.idVendita=idVendita;
       this.tipologiaCliente=tipologiaCliente;
       this.prodotto=prodotto;
       this.quantità=quantità;
       this.prezzoListino=prezzoListino;
       this.sconto=sconto;
       this.data=data;
       this.supporto=supporto;
       this.funzionario=funzionario;
       this.manager=manager;
    }
}

export default Vendita;
