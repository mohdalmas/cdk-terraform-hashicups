// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
//import { DataHashicupsCoffees } from "@cdktf/provider-hashicups/lib/data-hashicups-coffees";
import { DataHashicupsCoffees } from "@cdktf/provider-hashicups/lib/data-hashicups-coffees";
import { Order } from "@cdktf/provider-hashicups/lib/order";
import { TerraformStack, Testing } from "cdktf";
import "cdktf/lib/testing/adapters/jest"; // Load types for expect matchers
import { MyStack } from "../main";

describe('my-stack', () => {
  // see https://cdk.tf/testing for more testing tips
  // All unit tests test the synthesized terraform code, it does not create real-world resources
  // Please set 
  let stack: MyStack;
  let stackFullSynth: TerraformStack;
  let synthedOutputJSON: string;

  beforeAll(() => {
    /* Arrange */
    const app = Testing.app();
    stack = new MyStack(app, 'my-stack-test');
    stackFullSynth = new TerraformStack(app, "my-stack-test-FullSynth");
    /* Act */
    
    synthedOutputJSON = Testing.synth(stack);
    console.log(synthedOutputJSON)
  });
 
  it("check if Resources can be Validate", () => {
    const myAbstraction = new MyStack(stackFullSynth, "my-app");
    myAbstraction.runAllValidations
    // We need to do a full synth to Validate the terraform configuration
    expect(Testing.fullSynth(stackFullSynth)).toBeValidTerraform();
  });

  it('should contain hashicups provider', () => {
    /* Assert */
    expect(Testing.toHaveProvider(synthedOutputJSON, 'hashicups')).toBeTruthy();
  });
  
  it('should fetch coffee id from coffee datasource', () => {
    /* Assert */
    const coffees = ['Connectaccino','Vaulatte','Waypointiato']
    for (const coffee in coffees){
      expect(synthedOutputJSON).toHaveResourceWithProperties(DataHashicupsCoffees, {
        name: coffee
      });
    }
   
  });

  it('should contain Both Order Resources', () => {
    /* Assert */
    expect(synthedOutputJSON).toHaveResourceWithProperties(Order, {
      id: 'order1'
    });
    expect(synthedOutputJSON).toHaveResourceWithProperties(Order, {
      id: 'order2'
    });
  });
});
