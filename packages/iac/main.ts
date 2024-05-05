import { DataHashicupsCoffees } from "@cdktf/provider-hashicups/lib/data-hashicups-coffees";
import { Order } from "@cdktf/provider-hashicups/lib/order";
import { HashicupsProvider } from "@cdktf/provider-hashicups/lib/provider";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { Construct } from "constructs";


export class MyStack  extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this._setProviders();
    this._createOrders();
  }


private _setProviders(): void {
  // Retrieve credentials from environment variables
  const { HASHICUPS_HOST, HASHICUPS_USERNAME, HASHICUPS_PASSWORD } = process.env
  const host = HASHICUPS_HOST;
  const username = HASHICUPS_USERNAME;
  const password = HASHICUPS_PASSWORD;

  if (!host || !username || !password) {
    throw new Error('Missing required environment variables for HashiCups credentials');
  }

  // Initializing Provider with dynamic credentials
  new HashicupsProvider(this, 'hashicup', {
    host,
    username,
    password,
  });
}

private _createOrders(): void {
  //Read orders from the 'orders' directory
  const fs = require('fs'); // Import fs module for synchronous operations
  const path = require('path');
  const ordersDir = './orders';
  const orders = fs.readdirSync(ordersDir); // Synchronous readdir
  const orderDataArray = []; // Array to store all orders

  // Looping Each Order
  for (const order of orders) {
    const itemsPath = path.join(ordersDir, order); // Reading Items Path e.g /orders/order1/Item.txt
    const items = fs.readdirSync(itemsPath); // Reading ItemNames/ItemFileNames from Items Path 
    
    // Reading Each Items in items var
    const orderItems = items.map((itemFile: string) => {
      const itemName = path.parse(itemFile).name; // Parsing Item Name
      const coffee = new DataHashicupsCoffees(this,itemName);// Getting Coffee Details based on Coffee Name
      const itemQuantity = fs.readFileSync(path.join(itemsPath, itemFile), 'utf8'); // Reading File Name
      return { coffee:{id: coffee.id}, quantity: parseInt(itemQuantity) }; // Returning 1 Order in Each Iteration
    });
    
    // Map Object for Each Order then storing in Order Array
    const orderData = { orderId: order, items: orderItems };
    orderDataArray.push(orderData);
    
    //console.log(JSON.stringify(orderItems, null, 2));

    //Creating Order with OrderId and Order Items {name: string, quantity: int}[]
    new Order(this,""+order,{
      id: orderData.orderId,
      items: orderData.items
    });
    
  }

  new TerraformOutput(this,"tf-output",{value: orderDataArray});
 }

  }
const app = new App();
new MyStack(app, "hashicups-terraform");
app.synth();

