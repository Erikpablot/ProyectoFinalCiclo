package co.edu.usa.reto3.modelo.custom;

import co.edu.usa.reto3.modelo.Cliente;

public class CountCategoria {

    private Long total;
    private Cliente client;

    public CountCategoria(Long total, Cliente client) {
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Cliente getClient() {
        return client;
    }

    public void setClient(Cliente client) {
        this.client = client;
    }

    

   




}
