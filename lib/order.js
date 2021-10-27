import {Order, Customer, Item, Payment, NearbyStores, Tracking} from 'dominos';


class MakeOrder {

  constructor(params){
    this.params = params;
    this.customer;
  }

  setCustomer(){
    this.customer = new Customer(this.params.customer);
    return this.customer;
  }

  async findStores() {
    let distance = 100;
    let storeID;
    const nearbyStores = await new NearbyStores(this.customer.address);
    // console.log(nearbyStores.stores)
    for(const store of nearbyStores.stores){
      if (

        store.IsOnlineCapable && store.AllowDeliveryOrders
        && store.IsOpen
        && store.ServiceIsOpen.Delivery
        && store.MinDistance<distance
      ){
        distance = store.MinDistance;
        storeID = store.StoreID;
      }
    }
    if(storeID==0){
      return 'No stores open nearby.';
    }

    return [storeID, distance];
  }


}

export {
  MakeOrder as default,
  MakeOrder
}
