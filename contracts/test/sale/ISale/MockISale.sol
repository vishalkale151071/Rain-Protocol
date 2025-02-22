// SPDX-License-Identifier: CAL
pragma solidity =0.8.15;

import "../../../sale/ISale.sol";

contract MockISale is ISale {
    address public _reserve;
    SaleStatus public _saleStatus;
    address public _token;

    function setReserve(address reserve_) external {
        _reserve = reserve_;
    }

    function setSaleStatus(SaleStatus saleStatus_) external {
        _saleStatus = saleStatus_;
    }

    function setToken(address token_) external {
        _token = token_;
    }

    function reserve() external view returns (address) {
        return _reserve;
    }

    function saleStatus() external view returns (SaleStatus) {
        return _saleStatus;
    }

    function token() external view returns (address) {
        return _token;
    }
}
