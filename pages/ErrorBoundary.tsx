import React, { Component, ErrorInfo, ReactNode } from 'react';

import Box from 'userInterface/box/Box';
import Typography from 'userInterface/typography/Typography';
import { BoxPropsMapper, TypographyPropsMapper } from 'utils';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', 'ㄸㄲ꺆', error, 'ㅑㅜ럐', errorInfo);
  }

  public render() {
    const { error } = this.state;
    const BoxProps = BoxPropsMapper({
      size: 'custom',
      height: 'h-[300px]',
      width: 'w-full',
    });

    const TextProps = TypographyPropsMapper({
      type: 'title',
      text: error,
    });

    if (error) {
      return (
        <div className='w-[800px] h-[300px] mr-auto ml-auto text-center text-xl'>
          <Box {...BoxProps}>
            <div className='mt-7'>
              <Typography {...TextProps} />
            </div>
          </Box>
        </div>
      );
    }

    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
