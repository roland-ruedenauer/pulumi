// *** WARNING: this file was generated by test. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package example

import (
	"context"
	"reflect"

	"env-helper/example/mod1"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type ModuleTest struct {
	pulumi.CustomResourceState
}

// NewModuleTest registers a new resource with the given unique name, arguments, and options.
func NewModuleTest(ctx *pulumi.Context,
	name string, args *ModuleTestArgs, opts ...pulumi.ResourceOption) (*ModuleTest, error) {
	if args == nil {
		args = &ModuleTestArgs{}
	}

	var resource ModuleTest
	err := ctx.RegisterResource("example:index:moduleTest", name, args, &resource, opts...)
	if err != nil {
		return nil, err
	}
	return &resource, nil
}

// GetModuleTest gets an existing ModuleTest resource's state with the given name, ID, and optional
// state properties that are used to uniquely qualify the lookup (nil if not required).
func GetModuleTest(ctx *pulumi.Context,
	name string, id pulumi.IDInput, state *ModuleTestState, opts ...pulumi.ResourceOption) (*ModuleTest, error) {
	var resource ModuleTest
	err := ctx.ReadResource("example:index:moduleTest", name, id, state, &resource, opts...)
	if err != nil {
		return nil, err
	}
	return &resource, nil
}

// Input properties used for looking up and filtering ModuleTest resources.
type moduleTestState struct {
}

type ModuleTestState struct {
}

func (ModuleTestState) ElementType() reflect.Type {
	return reflect.TypeOf((*moduleTestState)(nil)).Elem()
}

type moduleTestArgs struct {
	Mod1 *mod1.Typ `pulumi:"mod1"`
	Val  *Typ      `pulumi:"val"`
}

// The set of arguments for constructing a ModuleTest resource.
type ModuleTestArgs struct {
	Mod1 mod1.TypPtrInput
	Val  TypPtrInput
}

func (ModuleTestArgs) ElementType() reflect.Type {
	return reflect.TypeOf((*moduleTestArgs)(nil)).Elem()
}

type ModuleTestInput interface {
	pulumi.Input

	ToModuleTestOutput() ModuleTestOutput
	ToModuleTestOutputWithContext(ctx context.Context) ModuleTestOutput
}

func (*ModuleTest) ElementType() reflect.Type {
	return reflect.TypeOf((*ModuleTest)(nil))
}

func (i *ModuleTest) ToModuleTestOutput() ModuleTestOutput {
	return i.ToModuleTestOutputWithContext(context.Background())
}

func (i *ModuleTest) ToModuleTestOutputWithContext(ctx context.Context) ModuleTestOutput {
	return pulumi.ToOutputWithContext(ctx, i).(ModuleTestOutput)
}

type ModuleTestOutput struct{ *pulumi.OutputState }

func (ModuleTestOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*ModuleTest)(nil))
}

func (o ModuleTestOutput) ToModuleTestOutput() ModuleTestOutput {
	return o
}

func (o ModuleTestOutput) ToModuleTestOutputWithContext(ctx context.Context) ModuleTestOutput {
	return o
}

func init() {
	pulumi.RegisterInputType(reflect.TypeOf((*ModuleTestInput)(nil)).Elem(), &ModuleTest{})
	pulumi.RegisterOutputType(ModuleTestOutput{})
}
