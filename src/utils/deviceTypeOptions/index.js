export const optionsDeviceType = (devices) => devices ? [...new Set(devices.map((device) => device.type))] : [];
