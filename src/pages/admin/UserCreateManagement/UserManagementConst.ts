export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const gender = ['male', 'female', 'others'];

export const bloodGroupOptions = bloodGroup.map((item) => ({
    value: item,
    label: item
}));

export const genderOptions = gender.map((item) => ({
    value: item.toLowerCase(),
    label: item
}));