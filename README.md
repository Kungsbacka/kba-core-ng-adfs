# kba-core-ng-adfs

Project stub for an Angular web application with a .NET Core controller protected by OIDC tokens provided by ADFS. Phew. 

The OIDC-ADFS configuration is based on descriptions from the following blog posts:

https://blogs.msdn.microsoft.com/azuredev/2017/09/22/protecting-a-net-core-2-0-spa-with-adfs/
https://www.scottbrady91.com/Angular/SPA-Authentiction-using-OpenID-Connect-Angular-CLI-and-oidc-client

## Structure

This project contains both an Angular frontend with OIDC capabilities and a .NET Core controller. Basically two separate projects in one. The Angular application has OIDC capabilities provided by [oidc-client-js](https://github.com/IdentityModel/oidc-client-js), while the .NET Core API uses Microsofts implementation of [OpenIdConnect](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.OpenIdConnect/).

## Initializing the project

Install the node dependencies:

`npm install`

Get the Nuget packages for .NET Core:

`dotnet restore`

## Building

Build the Angular part (resulting code ends up in the `wwwroot` directory):

`ng build`

Build the .NET part:

`dotnet build`

## Running

To run the entire project from .NET:

`dotnet run`

The application will be available at https://localhost:5001/. 

This is not entirely practical when doing frontend development. In this case, run the .NET parts in one terminal and start the Angular development server in another:

`ng serve --ssl` 

This will make the live updateable dev server available at https://localhost:4200/. Note that you will need to change the "redirect URI" in ADFS to reflect this.

## ADFS 4.0 configuration

