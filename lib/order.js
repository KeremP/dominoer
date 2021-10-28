import {Order, Customer, Item, Payment, NearbyStores, Tracking} from 'dominos';


class MakeOrder {

  constructor(params){
    this.params = params;
    this.customer;
    this.order;
  }

  setCustomer(){
    this.customer = new Customer(this.params.customer);
    return this.customer;
  }


  async findStores() {
    let distance = 100;
    let storeID;
    let addressDesc;
    let serviceHours;
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
        addressDesc = store.AddressDescription;
        serviceHours = store.ServiceHoursDescription;
        this.nearestStore = store;
      }
    }
    if(storeID==0){
      return 'No stores open nearby.';
    }

    return [storeID, distance, addressDesc, serviceHours];
  }

  async newOrder(itemArray){
    this.order = new Order(this.customer);
    let storeInfo = await this.findStores();
    this.order.storeID = storeInfo[0];
    for(let i=0;i<itemArray.length;i++){
      this.order.addItem(itemArray[i])
    }
    await this.order.validate()

    await this.order.price()

    console.log("\nPrice of Order: \n")
    console.dir(this.order, {depth:0})
  }


}

export {
  MakeOrder as default,
  MakeOrder
}
