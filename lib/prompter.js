import inquirer from 'inquirer'
import { Menu } from 'dominos'

export const getCustomerDetails = () => {

    const prompts = [

      {
        name:'address',
        type: 'input',
        message: 'please enter your full address (include commas and spaces): ',
        validate: function(value){
          if (value.length){
            return true;
          }else{
            return 'Please enter your full address to get pizza';
          }
        }
      },

      {
        name:'firstName',
        type:'input',
        message:'First name: ',
        validate: function(value){
          if (value.length){
            return true;
          }else{
            return 'Please enter your first name';
          }
        }
      },

      {
        name:'lastName',
        type:'input',
        message:'Last name: ',
        validate: function(value){
          if (value.length){
            return true;
          }else{
            return 'Please enter your last name';
          }
        }
      },

      {
        name:'phone',
        type:'input',
        message:'Please enter your phone number: ',
        validate: function(value){
          if (value.length){
            return true;
          }else{
            return "Please enter your phone number. How else will they update you about the 'za?";
          }
        }
      },

      {
        name:'email',
        type:'input',
        message:'Please enter your email address: ',
        validate: function(value){
          if (value.length){
            return true;
          }else{
            return "Please enter your email. This may actually be optional.";
          }
        }
      }

    ];
    return inquirer.prompt(prompts);
  }

export const selectAction = () => {
  const prompts = [
    {
      name:'action',
      type:'list',
      message:'What would you like to do?',
      choices:["View menu", "View closest stores"]
    }
  ];
  return inquirer.prompt(prompts);
}

export const insepctMenu = async() => {
  const menu = await new Menu(4337);
  return menu;

}
