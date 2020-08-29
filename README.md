# getRCMGroupList

## This script can fetch RCM downline of the provided distributor ID.

## To execute simply login to your RCM Business account and paste this code to your browser console.

### The first parameter is the distributor number whose downline is to be fetched.
### The second parameter is a Javascript object which consists of different options to modify the output below is the description

Option | Description
------ | -------
**fetchZeroBV:** | set this if you only want to fetch the distributors with their Business volume zero.
**ignoreInvalidUsers:** | set this if you want to ignore fetching the distributors with their status Terminated or KYC problems.
**pushObj:** | set this if you want the output as Array of obj instead of Array of strings ("[12345678] Abc Xyz BV:578").
