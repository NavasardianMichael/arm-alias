export const canvasCreator = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) return;
  let context = canvas.getContext("2d");
  if (!context) return;

  const color = 'black';
  const headDx = 2 * Math.PI / 30
  const lineDx = 2
  let isAnimationActive = false

  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  // For drawing lines
  const drawLine = (fromX: number, fromY: number, toX: number, toY: number) => {
    
    const isPositiveXDirection = toX - fromX > 0     
    const isPositiveYDirection = toY - fromY > 0
    const lineXDx = isPositiveXDirection ? fromX + lineDx : fromX - lineDx
    const lineYDx = isPositiveYDirection ? fromY + lineDx : fromY - lineDx
    
    if (
      !context || 
      (!(toX - fromX) && !(toY - fromY))
    ) return;

    
    context.moveTo(fromX, fromY);
    context.lineTo(lineXDx, lineYDx);
    context.stroke();
    context.lineWidth = 3
    context.strokeStyle = color
    requestAnimationFrame(
      () => drawLine(
        Math[isPositiveXDirection ? 'min' : 'max'](lineXDx, toX), 
        Math[isPositiveYDirection ? 'min' : 'max'](lineYDx, toY), 
        toX, 
        toY
      )
    )
  };

  // const drawLine = (fromX: number, fromY: number, toX: number, toY: number) => {
  //   if (!context) return;
  //   context.moveTo(fromX, fromY);
  //   context.lineTo(toX, toY);
  //   context.stroke();
  // };

  
  const head: CanvasPath['arc'] = (x, y, radius, startAngle, endAngle, counterclockwise = false) => {
    console.log({startAngle, end: startAngle+headDx});
    
    if (!context || startAngle >= endAngle) return;
    context.beginPath();
    context.arc(x, y, radius, startAngle, startAngle+headDx, counterclockwise);
    context.stroke();
    context.lineWidth = 4
    context.strokeStyle = color
    context.closePath()
    requestAnimationFrame(() => head(
      x,
      y,
      radius,
      startAngle+headDx,
      endAngle
    ))
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    if (!context) return;
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 130);
    // //top line
    drawLine(10, 10, 70, 10);
    // //small top line
    drawLine(70, 10, 70, 20);
  };

  return [initialDrawing, () => head(70, 30, 10, 0, Math.PI * 2), body, leftArm, rightArm, leftLeg, rightLeg];
};
