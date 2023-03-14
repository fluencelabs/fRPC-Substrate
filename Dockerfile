FROM node:16.17
SHELL ["/bin/bash"]
RUN ["npm", "i", "-g", "@fluencelabs/cli@0.3.8"]
COPY . /opt/frpc-substrate

# Install base packages
WORKDIR /opt/frpc-substrate/gateway
RUN ["npm", "i"]

# Expose the listening port
EXPOSE 3000

RUN ["fluence", "aqua", "-i", "aqua/", "-o", "aqua-compiled/", "--js"]
CMD ["node", "src/index.js", "configs/quickstart_config.json"]