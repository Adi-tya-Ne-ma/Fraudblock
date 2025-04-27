// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract ProductRegistry {
    struct Product {
        uint256 productId;
        string manufacturerId;
        string productSN;
        string productName;
        uint256 productPrice;
        address currentOwner;
        string sellerId;
        string consumerId;
        bool isAuthentic;
    }

    mapping(string => Product) public products;

    event ProductAdded(string productSN, string manufacturerId);
    event ProductSoldToSeller(string productSN, string sellerId, address sellerAddress, uint256 price);
    event ProductSoldToConsumer(string productSN, string consumerId, address consumerAddress, uint256 price);
    event DebugEvent(string message, address currentOwner, address sender, uint256 value);

    function addProduct(
        string memory _manufacturerId,
        string memory _productSN,
        string memory _productName,
        uint256 _productPrice
    ) public {
        require(bytes(products[_productSN].productSN).length == 0, "Product already exists");

        products[_productSN] = Product({
            productId: uint256(keccak256(abi.encodePacked(_productSN))),
            manufacturerId: _manufacturerId,
            productSN: _productSN,
            productName: _productName,
            productPrice: _productPrice,
            currentOwner: msg.sender,
            sellerId: "",
            consumerId: "",
            isAuthentic: true
        });

        emit ProductAdded(_productSN, _manufacturerId);
    }

    function sellProductToSeller(string memory _productSN, string memory _sellerId) public payable {
        Product storage product = products[_productSN];
        require(bytes(product.productSN).length > 0, "Product does not exist");
        require(product.currentOwner == msg.sender, "Only the owner can sell");
        require(msg.value == product.productPrice, "Incorrect ETH amount sent");

        product.sellerId = _sellerId;
        product.currentOwner = msg.sender; // Update the owner to the seller

        payable(msg.sender).transfer(msg.value); // Transfer ETH to the manufacturer
        emit ProductSoldToSeller(_productSN, _sellerId, msg.sender, msg.value);
    }

    function sellProductToConsumer(string memory _productSN, string memory _consumerId) public payable {
        Product storage product = products[_productSN];
        require(bytes(product.productSN).length > 0, "Product does not exist");
        require(product.currentOwner == msg.sender, "Only the owner can sell");
        require(msg.value == product.productPrice, "Incorrect ETH amount sent");

        emit DebugEvent("Before updating consumerId and currentOwner", product.currentOwner, msg.sender, msg.value);

        product.consumerId = _consumerId;
        product.currentOwner = msg.sender; // Update the owner to the consumer's address

        emit DebugEvent("After updating consumerId and currentOwner", product.currentOwner, msg.sender, msg.value);

        payable(product.currentOwner).transfer(msg.value); // Transfer ETH to the seller
        emit ProductSoldToConsumer(_productSN, _consumerId, msg.sender, msg.value);
    }

    function verifyProduct(string memory _productSN) public view returns (Product memory) {
        require(bytes(products[_productSN].productSN).length > 0, "Product does not exist");
        return products[_productSN];
    }
}
