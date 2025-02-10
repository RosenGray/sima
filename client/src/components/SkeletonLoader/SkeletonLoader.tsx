import { Box, Flex, Skeleton } from '@radix-ui/themes';

const SkeletonLoader = () => {
  return (
    <Box style={{ maxWidth: '42rem', margin: '0 auto', padding: '24px' }}>
      {/* Header Section */}
      <Skeleton style={{ height: '32px', width: '75%', marginBottom: '32px' }} />
      
      {/* Form Fields */}
      <Flex direction="column" gap="4">
        {/* Field 1 */}
        <Box>
          <Skeleton style={{ height: '16px', width: '96px', marginBottom: '8px' }} />
          <Skeleton style={{ height: '40px', width: '100%' }} />
        </Box>

        {/* Field 2 */}
        <Box>
          <Skeleton style={{ height: '16px', width: '128px', marginBottom: '8px' }} />
          <Skeleton style={{ height: '40px', width: '100%' }} />
        </Box>

        {/* Textarea Field */}
        <Box>
          <Skeleton style={{ height: '16px', width: '112px', marginBottom: '8px' }} />
          <Skeleton style={{ height: '96px', width: '100%' }} />
        </Box>

        {/* Checkbox Area */}
        <Flex gap="2" align="center">
          <Skeleton style={{ height: '20px', width: '20px' }} />
          <Skeleton style={{ height: '16px', width: '160px' }} />
        </Flex>

        {/* Submit Button */}
        <Skeleton style={{ height: '40px', width: '128px', marginTop: '16px' }} />
      </Flex>
    </Box>
  );
};

export default SkeletonLoader;