const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);
console.log("WEBPACK CONFIG =>>>>>")
module.exports = {
  output: {
    uniqueName: "StateMachine",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      // name: "shell",
      // filename: "remoteEntry.js",
      // exposes: {
      //     './Component': './/src/app/app.component.ts',
      // },

      // For hosts (please adjust)
      remotes: {
        mfe1: "mfe1@http://localhost:3000/remoteEntry.js",
        mfe2: "mfe2@http://localhost:7000/remoteEntry.js",
        mfe3: "mapApp@http://localhost:3001/remoteEntry.js"
      },

      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager:true
        },
        "@angular/common": {
          singleton: false,
          strictVersion: false,
          requiredVersion: "auto",
          eager:true
        },
       
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager:true
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager:true
        },
        "@ngrx/store":{
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager:true
        },
        "@ngrx/effects":{
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager:true
        },
        
        

        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
