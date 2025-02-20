// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketMaster is ERC721, Ownable {
    uint256 public totalOccasions;
    uint256 public totalSupply;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    mapping(uint256 => Occasion) public occasions;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => uint256[]) public seatsTaken;
    mapping(uint256 => bool) public ticketExhausted;
    mapping(uint256 => bool) public resaleAllowed;    



    constructor() ERC721("Token", "Ticket")Ownable(msg.sender) {
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        totalOccasions++;
        occasions[totalOccasions] = Occasion(
            totalOccasions, _name, _cost, _maxTickets, _maxTickets, _date, _time, _location
        );
    }

    function mint(uint256 _id, uint256 _seat) public payable {
        require(_id != 0 && _id <= totalOccasions, "Invalid occasion ID");
        require(msg.value >= occasions[_id].cost, "Insufficient ETH sent");
        require(seatTaken[_id][_seat] == address(0), "Seat already taken");
        require(_seat <= occasions[_id].maxTickets, "Invalid seat number");

        totalSupply++;
        occasions[_id].tickets--;
        hasBought[_id][msg.sender] = true;
        seatTaken[_id][_seat] = msg.sender;
        seatsTaken[_id].push(_seat);
        resaleAllowed[totalSupply] = true;

        _safeMint(msg.sender, totalSupply);
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occasions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    function scanTicket(uint256 _ticketId) public onlyOwner {
        require((_ticketId >totalSupply), "Ticket does not exist");
        require(!ticketExhausted[_ticketId], "Ticket already used");

        ticketExhausted[_ticketId] = true;
        resaleAllowed[_ticketId] = false;
    }

    function resellTicket(address _to, uint256 _ticketId) public {
        require(resaleAllowed[_ticketId], "Resale not allowed");
        require(!ticketExhausted[_ticketId], "Ticket already used");

        _transfer(msg.sender, _to, _ticketId);
        resaleAllowed[_ticketId] = true;
    }
}
