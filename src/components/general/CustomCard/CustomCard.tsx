// import React from 'react';
// import { View, StyleProp, ViewStyle, Platform } from 'react-native';

// // Define the props interface
// interface CustomCardProps {
//   containerStyle?: StyleProp<ViewStyle>;
//   wrapperStyle?: StyleProp<ViewStyle>;
//   children?: React.ReactNode;
// }

// // CustomCard component with enhanced styling
// const CustomCard: React.FC<CustomCardProps> = ({ containerStyle, wrapperStyle, children }) => {
//   return (
//     <View style={[
//       {
//         padding: 10,
//         borderRadius: 10,
//         backgroundColor: 'white',
//         ...Platform.select({
//           ios: {
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.1,
//             shadowRadius: 2,
//           },
//           android: {
//             elevation: 5,
//           },
//         }),
//       },
//       containerStyle
//     ]}>
//       <View style={[{ alignItems: 'center', justifyContent: 'center' }, wrapperStyle]}>
//         {children}
//       </View>
//     </View>
//   );
// };

// export default CustomCard;
