# Yassir Platform Engineering Take Home Challenge || Submission By Mohd Almas || Email: mohdalmas0@gmail.com 

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/mohdalmas/terraform-hashicups)

- Clone this repository to the local System Or Open the Code in the GitPod Environment.

## Prerequisites:
The stack used here is close to what we use for Infrastructure As Code. Mainly:

- [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).
- [CDK for Terraform](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-install).
- Typescript as the IaC language of choice.
- A [monorepo](https://monorepo.tools/) managed with [pnpm](https://pnpm.io/).
- Install Docker: [For Windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*19e07f8*_ga*MjE0MzkxMDk3My4xNjg3NTQ0Mzc0*_ga_XJWPQMJYHQ*MTcxNDkwMTcwOS4xNy4xLjE3MTQ5MDE3MTEuNTguMC4w) [For Linux](https://docs.docker.com/desktop/linux/install/?_gl=1*10wqm7z*_ga*MjE0MzkxMDk3My4xNjg3NTQ0Mzc0*_ga_XJWPQMJYHQ*MTcxNDkwMTcwOS4xNy4xLjE3MTQ5MDE3NzEuNjAuMC4w).

## Process:
- Once you have the above-mentioned tools installed you can run `pnpm install` to install the npm/Typescript dependencies.
- Navigate to Dir **hashicorpdemoapp setup** and Run **docker-compose up -d** to create the **Hashicups APIs** services.
- Check If API and DB services are up, using **docker ps** or **docker-compose ps**, In case of error check logs: **docker logs <containerID>** or **docker-compose logs**.
- Once all services are up, we are ready to Run Unit Tests, Navigate to __test__ and run this command to start Tests: **pnpm run test**
- Naivgate to Dir **packages/iac/** and run this command to Deploy Stack use Command: **cdktf deploy**


**Note: For your convenience, we also provided a `.gitpod.yml` file so you can have an already setup environment on GitPod. Simply click "Open in Gitpod" button above**.


## The deliverable
- Run `pnpm install` for all required/new dependencies.  --> **DONE**
- A way or a command to run Hashicups APIs locally. We recommend using docker compose for that. The GitPod environment already has docker compose installed for you. --> Docker-compose file has been Included to setup API server and DB service to create Orders, Command to create compose services: **docker-compose up -d**

- `README.md` file updated, or a `help` file included on how to provision the infrastructure using Hashicups. --> **DONE**
  
- Be able to provision the CRUD operation for the coffee-shop. The Infrastructure as Code should go under `packages/iac`. --> **DONE**

- Have at least two different coffee types, [with different ingredients, price and description](https://registry.terraform.io/providers/hashicorp/hashicups/latest/docs/data-sources/coffee). They should be treated as two completely different products for our orders. 
--> **DONE**
  - TypeScript Code Has been Stored in /package/iac/main.ts.
  - **INPUT**: Created orders Folder with below structure Items and this will be Input to create Orders with their Items.

    | orders   | items             |
    |----------|-------------------|
    | order1   | Connectaccino.txt |
    |          | Vaulatte.txt      |
    | order2   | Waypointiato.txt  |

- A way to destroy/cleanup the infrastructure. --> **cdktf destroy**



