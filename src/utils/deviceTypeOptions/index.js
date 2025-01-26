export const optionsDeviceType = (devices) => devices ? ['ALL', ...new Set(devices.map((device) => device.type))] : [];
