// utils/helpers.js

export const carModels = {
  "Toyota Camry": {
    name: "Toyota Camry",
    year: "2023",
    width: 39.4,
    height: 18.9,
    depth_folded: 15.1,
    depth_unfolded: 38.5,
    volume_folded: 15.1,
    volume_unfolded: 28.4
  },
  "Toyota Corolla": {
    name: "Toyota Corolla",
    year: "2023",
    width: 37.2,
    height: 18.1,
    depth_folded: 14.5,
    depth_unfolded: 36.0,
    volume_folded: 13.1,
    volume_unfolded: 23.3
  },
  "Toyota Prius": {
    name: "Toyota Prius",
    year: "2023",
    width: 36.8,
    height: 17.8,
    depth_folded: 14.8,
    depth_unfolded: 34.6,
    volume_folded: 14.0,
    volume_unfolded: 27.4
  },
  "Toyota Avalon": {
    name: "Toyota Avalon",
    year: "2023",
    width: 39.0,
    height: 19.5,
    depth_folded: 15.3,
    depth_unfolded: 38.0,
    volume_folded: 16.1,
    volume_unfolded: 28.5
  },
  "Toyota Mirai": {
    name: "Toyota Mirai",
    year: "2023",
    width: 37.5,
    height: 18.5,
    depth_folded: 14.6,
    depth_unfolded: 33.8,
    volume_folded: 12.8,
    volume_unfolded: 22.2
  },
  "Toyota GR Supra": {
    name: "Toyota GR Supra",
    year: "2023",
    width: 35.5,
    height: 16.7,
    depth_folded: 13.4,
    depth_unfolded: 30.5,
    volume_folded: 9.9,
    volume_unfolded: 12.4
  },
  "Toyota Yaris": {
    name: "Toyota Yaris",
    year: "2023",
    width: 35.0,
    height: 17.0,
    depth_folded: 13.0,
    depth_unfolded: 30.0,
    volume_folded: 9.5,
    volume_unfolded: 17.0
  },
  "Toyota RAV4": {
    name: "Toyota RAV4",
    year: "2023",
    width: 40.9,
    height: 31.9,
    depth_folded: 15.2,
    depth_unfolded: 58.1,
    volume_folded: 32.1,
    volume_unfolded: 69.8
  },
  "Toyota Highlander": {
    name: "Toyota Highlander",
    year: "2023",
    width: 43.0,
    height: 33.0,
    depth_folded: 17.0,
    depth_unfolded: 62.0,
    volume_folded: 16.0,
    volume_unfolded: 84.3
  },
  "Toyota 4Runner": {
    name: "Toyota 4Runner",
    year: "2023",
    width: 43.5,
    height: 33.5,
    depth_folded: 17.2,
    depth_unfolded: 61.5,
    volume_folded: 17.9,
    volume_unfolded: 89.7
  },
  "Toyota Sequoia": {
    name: "Toyota Sequoia",
    year: "2023",
    width: 48.0,
    height: 36.0,
    depth_folded: 25.0,
    depth_unfolded: 72.0,
    volume_folded: 22.3,
    volume_unfolded: 120.1
  },
  "Toyota Land Cruiser": {
    name: "Toyota Land Cruiser",
    year: "2023",
    width: 47.5,
    height: 35.5,
    depth_folded: 24.5,
    depth_unfolded: 71.5,
    volume_folded: 22.0,
    volume_unfolded: 117.0
  },
  "Toyota Sienna": {
    name: "Toyota Sienna",
    year: "2023",
    width: 47.0,
    height: 35.0,
    depth_folded: 24.0,
    depth_unfolded: 70.0,
    volume_folded: 33.5,
    volume_unfolded: 101.0
  },
  "Toyota Tacoma": {
    name: "Toyota Tacoma",
    year: "2023",
    width: 44.0,
    height: 34.0,
    depth_folded: 18.5,
    depth_unfolded: 65.0,
    volume_folded: 16.8,
    volume_unfolded: 73.2
  },
  "Toyota Tundra": {
    name: "Toyota Tundra",
    year: "2023",
    width: 49.0,
    height: 36.5,
    depth_folded: 26.0,
    depth_unfolded: 74.0,
    volume_folded: 19.5,
    volume_unfolded: 98.0
  },
  "Toyota Venza": {
    name: "Toyota Venza",
    year: "2023",
    width: 41.0,
    height: 32.0,
    depth_folded: 16.0,
    depth_unfolded: 57.0,
    volume_folded: 28.8,
    volume_unfolded: 55.1
  },
  "Toyota C-HR": {
    name: "Toyota C-HR",
    year: "2023",
    width: 39.5,
    height: 30.0,
    depth_folded: 15.0,
    depth_unfolded: 50.0,
    volume_folded: 19.1,
    volume_unfolded: 37.0
  },
  "Toyota bZ4X": {
    name: "Toyota bZ4X",
    year: "2023",
    width: 40.0,
    height: 31.0,
    depth_folded: 15.5,
    depth_unfolded: 55.0,
    volume_folded: 27.7,
    volume_unfolded: 56.0
  },
  "Toyota RAV4 Hybrid": {
    name: "Toyota RAV4 Hybrid",
    year: "2023",
    width: 40.9,
    height: 31.9,
    depth_folded: 15.2,
    depth_unfolded: 58.1,
    volume_folded: 37.6,
    volume_unfolded: 69.8
  },
  "Toyota Corolla Cross": {
    name: "Toyota Corolla Cross",
    year: "2023",
    width: 40.5,
    height: 30.5,
    depth_folded: 15.0,
    depth_unfolded: 52.0,
    volume_folded: 26.5,
    volume_unfolded: 47.2
  }
};

export const luggageTemplates = [
  {
    name: 'Medium Duffle Bag 55L',
    size: [22.8, 13.3, 9.5],
    display: 'Medium Duffle Bag 55L (22.8" x 13.3" x 9.5")'
  },
  {
    name: 'Large Duffle Bag 70L',
    size: [26, 14, 11],
    display: 'Large Duffle Bag 70L (26" x 14" x 11")'
  },
  {
    name: 'Hand Bag',
    size: [15, 10, 6],
    display: 'Hand Bag (15" x 10" x 6")'
  },
  {
    name: 'Small Suitcase',
    size: [20, 14, 9],
    display: 'Small Suitcase (20" x 14" x 9")'
  },
  {
    name: 'Medium Checked Suitcase',
    size: [25, 16, 11],
    display: 'Medium Checked Suitcase (25" x 16" x 11")'
  }
];

