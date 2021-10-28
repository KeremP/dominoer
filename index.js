import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import { getCustomerDetails, insepctMenu, selectAction } from './lib/prompter.js';
import { MakeOrder } from './lib/order.js';
import { Item } from 'dominos';




const main = async () => {
  await clear();

  console.log(
    chalk.yellow(
      figlet.textSync("Dominoer", {horizontalLayout:'full'})
    )
  );

  const info = await getCustomerDetails();
  // console.log(info);
  const info_ = {
    "customer":{...info}
  }

  const order = new MakeOrder(info_);

  const customer = order.setCustomer();

  // console.log(customer);

  const action = await selectAction();
  // console.log(action);
  if (action.action == "View menu"){
    const menu = await insepctMenu()
    console.log(menu.menu.preconfiguredProducts);
  }else if(action.action == "View closest stores"){
    const stores = await order.findStores();
    console.log("Store ID:", stores[0]," ", "Distance:", stores[1])

    console.log("\nAddress/Desc:\n", stores[2], "\nService Hours:", stores[3])
  }else{

    const pizza = new Item({
        code:'14SCREEN',
        options:{
          P:{'1/1':'1'}
        }
    })
    order.newOrder([pizza])
  }


}


main();
