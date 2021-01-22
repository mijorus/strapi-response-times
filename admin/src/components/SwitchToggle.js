import React, { useState } from 'react';
import { Toggle } from '@buffetjs/core';

export function SwitchToggle({ initialValue }) {
    const [value, setValue] = useState(initialValue || false);
    return (
        <Toggle
            name="toggle"
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
        />
    )
}