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
        bool isAuthentic;
    }

    struct Seller {
        string sellerId;
        string sellerSN;
        address sellerAddress;
    }

    mapping(string => Product) public products;
    mapping(string => Seller) public sellers;

    event ProductAdded(string productSN, string manufacturerId);
    event ProductSoldToSeller(string productSN, string sellerId);
    event ProductSoldToConsumer(string productSN, string consumerId);

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
            isAuthentic: true
        });

        emit ProductAdded(_productSN, _manufacturerId);
    }

    function addSeller(string memory _sellerId, string memory _sellerSN) public {
        require(bytes(sellers[_sellerId].sellerId).length == 0, "Seller already exists");

        sellers[_sellerId] = Seller({
            sellerId: _sellerId,
            sellerSN: _sellerSN,
            sellerAddress: msg.sender
        });
    }

    function sellProductToSeller(string memory _productSN, string memory _sellerId) public {
        require(bytes(products[_productSN].productSN).length > 0, "Product does not exist");
        require(products[_productSN].currentOwner == msg.sender, "Only the owner can sell");
        
        products[_productSN].currentOwner = msg.sender;
        
        emit ProductSoldToSeller(_productSN, _sellerId);
    }

    function sellProductToConsumer(string memory _productSN, string memory _consumerId) public {
        require(bytes(products[_productSN].productSN).length > 0, "Product does not exist");
        require(products[_productSN].currentOwner == msg.sender, "Only the owner can sell");
        
        products[_productSN].currentOwner = address(0); // Consumer holds it off-chain
        emit ProductSoldToConsumer(_productSN, _consumerId);
    }

    function verifyProduct(string memory _productSN) public view returns (bool) {
        require(bytes(products[_productSN].productSN).length > 0, "Product does not exist");
        return products[_productSN].isAuthentic;
    }
}
