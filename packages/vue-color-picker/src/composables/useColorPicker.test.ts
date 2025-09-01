import { describe, it, expect } from 'vitest';
import { useColorPicker } from './useColorPicker';

describe('useColorPicker', () => {
  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { selfColor, inputColor, saturationPosition, huePosition } = useColorPicker({});
      
      expect(inputColor.value).toBe('#FFFFFF');
      expect(selfColor.value.hex).toBe('#FFFFFF');
      expect(selfColor.value.rgb).toEqual({ r: 255, g: 255, b: 255 });
      expect(selfColor.value.hsv).toEqual({ h: 0, s: 0, v: 100 });
      expect(saturationPosition.value).toEqual({ x: 0, y: 0 });
      expect(huePosition.value).toEqual({ x: 0, y: 0 });
    });

    it('should initialize with custom color', () => {
      const { selfColor, inputColor } = useColorPicker({ initialColor: '#FF0000' });
      
      expect(inputColor.value).toBe('#FF0000');
      expect(selfColor.value.hex).toBe('#FF0000');
      expect(selfColor.value.rgb).toEqual({ r: 255, g: 0, b: 0 });
      expect(selfColor.value.hsv.h).toBeCloseTo(0);
      expect(selfColor.value.hsv.s).toBeCloseTo(100);
      expect(selfColor.value.hsv.v).toBeCloseTo(100);
    });

    it('should initialize with custom dimensions', () => {
      const width = 300;
      const height = 200;
      const { saturationPosition, huePosition } = useColorPicker({
        initialColor: '#808080',
        width,
        height
      });
      
      // Gray color: HSV(0, 0, 50.2)
      expect(saturationPosition.value.x).toBeCloseTo(0);
      expect(saturationPosition.value.y).toBeCloseTo(height * 0.498, 1);
      expect(huePosition.value.x).toBeCloseTo(0);
      expect(huePosition.value.y).toBeCloseTo(0);
    });
  });

  describe('onSetHex', () => {
    it('should update color when valid hex is provided', () => {
      const { selfColor, inputColor, onSetHex } = useColorPicker({});
      
      const mockEvent = {
        currentTarget: { value: '#00FF00' }
      } as unknown as MouseEvent;
      
      onSetHex(mockEvent);
      
      expect(inputColor.value).toBe('#00FF00');
      expect(selfColor.value.hex).toBe('#00FF00');
      expect(selfColor.value.rgb).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('should update inputColor but not selfColor for invalid hex', () => {
      const { selfColor, inputColor, onSetHex } = useColorPicker({ initialColor: '#FF0000' });
      
      const mockEvent = {
        currentTarget: { value: '#GG0000' }
      } as unknown as MouseEvent;
      
      onSetHex(mockEvent);
      
      expect(inputColor.value).toBe('#GG0000');
      expect(selfColor.value.hex).toBe('#FF0000'); // Should remain unchanged
    });

    it('should handle short hex format', () => {
      const { selfColor, inputColor, onSetHex } = useColorPicker({});
      
      const mockEvent = {
        currentTarget: { value: 'invalid' }
      } as unknown as MouseEvent;
      
      onSetHex(mockEvent);
      
      expect(inputColor.value).toBe('invalid');
      expect(selfColor.value.hex).toBe('#FFFFFF'); // Should remain default
    });
  });

  describe('onMoveSaturation', () => {
    it('should update color based on saturation position', () => {
      const width = 200;
      const height = 150;
      const { selfColor, onMoveSaturation } = useColorPicker({ 
        initialColor: '#FF0000',
        width,
        height
      });
      
      onMoveSaturation({ x: 100, y: 75 });
      
      // Should be 50% saturation, 50% value
      expect(selfColor.value.hsv.s).toBeCloseTo(50);
      expect(selfColor.value.hsv.v).toBeCloseTo(50);
      expect(selfColor.value.hsv.h).toBeCloseTo(0); // Hue should remain unchanged
    });

    it('should handle edge positions', () => {
      const width = 200;
      const height = 150;
      const { selfColor, onMoveSaturation } = useColorPicker({ 
        initialColor: '#FF0000',
        width,
        height
      });
      
      // Top-left corner (0% saturation, 100% value)
      onMoveSaturation({ x: 0, y: 0 });
      expect(selfColor.value.hsv.s).toBeCloseTo(0);
      expect(selfColor.value.hsv.v).toBeCloseTo(100);
      
      // Bottom-right corner (100% saturation, 0% value)
      onMoveSaturation({ x: width, y: height });
      expect(selfColor.value.hsv.s).toBeCloseTo(100);
      expect(selfColor.value.hsv.v).toBeCloseTo(0);
    });
  });

  describe('onMoveHue', () => {
    it('should update hue for horizontal direction', () => {
      const width = 360;
      const { selfColor, onMoveHue } = useColorPicker({ 
        initialColor: '#FF0000',
        width,
        direction: 'horizontal'
      });
      
      onMoveHue({ x: 180, y: 0 });
      
      expect(selfColor.value.hsv.h).toBeCloseTo(180);
      expect(selfColor.value.hsv.s).toBeCloseTo(100); // Should remain unchanged
      expect(selfColor.value.hsv.v).toBeCloseTo(100); // Should remain unchanged
    });

    it('should update hue for vertical direction', () => {
      const height = 360;
      const { selfColor, onMoveHue } = useColorPicker({ 
        initialColor: '#FF0000',
        height,
        direction: 'vertical'
      });
      
      onMoveHue({ x: 0, y: 180 });
      
      expect(selfColor.value.hsv.h).toBeCloseTo(180);
      expect(selfColor.value.hsv.s).toBeCloseTo(100); // Should remain unchanged
      expect(selfColor.value.hsv.v).toBeCloseTo(100); // Should remain unchanged
    });

    it('should handle edge positions', () => {
      const width = 300;
      const { selfColor, onMoveHue } = useColorPicker({ 
        initialColor: '#FF0000',
        width,
        direction: 'horizontal'
      });
      
      // Start position
      onMoveHue({ x: 0, y: 0 });
      expect(selfColor.value.hsv.h).toBeCloseTo(0);
      
      // End position
      onMoveHue({ x: width, y: 0 });
      expect(selfColor.value.hsv.h).toBeCloseTo(360);
    });
  });

  describe('computed positions', () => {
    it('should calculate saturation position correctly', () => {
      const width = 200;
      const height = 100;
      const { saturationPosition, onMoveSaturation } = useColorPicker({ 
        initialColor: '#FF0000',
        width,
        height
      });
      
      // Move to 25% saturation, 75% value
      onMoveSaturation({ x: 50, y: 25 });
      
      expect(saturationPosition.value.x).toBeCloseTo(50);
      expect(saturationPosition.value.y).toBeCloseTo(25);
    });

    it('should calculate hue position correctly for horizontal', () => {
      const width = 360;
      const height = 20;
      const { huePosition, onMoveHue } = useColorPicker({ 
        initialColor: '#FF0000',
        width,
        height,
        direction: 'horizontal'
      });
      
      onMoveHue({ x: 90, y: 10 });
      
      expect(huePosition.value.x).toBeCloseTo(90);
      expect(huePosition.value.y).toBeCloseTo(90 * height / 360);
    });

    it('should calculate hue position correctly for vertical', () => {
      const width = 20;
      const height = 360;
      const { huePosition, onMoveHue } = useColorPicker({ 
        initialColor: '#FF0000',
        width,
        height,
        direction: 'vertical'
      });
      
      onMoveHue({ x: 10, y: 90 });
      
      expect(huePosition.value.x).toBeCloseTo(90 * width / 360);
      expect(huePosition.value.y).toBeCloseTo(90);
    });
  });

  describe('color synchronization', () => {
    it('should keep inputColor in sync with selfColor', () => {
      const { inputColor, onMoveSaturation, onMoveHue } = useColorPicker({ 
        initialColor: '#FF0000',
        width: 200,
        height: 150
      });
      
      onMoveSaturation({ x: 100, y: 75 });
      expect(inputColor.value).toMatch(/^#[0-9a-f]{6}$/i);
      
      onMoveHue({ x: 100, y: 0 });
      expect(inputColor.value).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});