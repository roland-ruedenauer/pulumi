// Copyright 2016-2017, Pulumi Corporation.  All rights reserved.

package resource

import (
	"github.com/pulumi/pulumi-fabric/pkg/tokens"
	"github.com/pulumi/pulumi-fabric/pkg/util/contract"
)

// State is a structure containing state associated with a resource.  This resource may have been serialized and
// deserialized, or snapshotted from a live graph of resource objects.  The value's state is not, however, associated
// with any runtime objects in memory that may be actively involved in ongoing computations.
type State struct {
	Type     tokens.Type // the resource's type.
	URN      URN         // the resource's object urn, a human-friendly, unique name for the resource.
	ID       ID          // the resource's unique ID, assigned by the resource provider (or blank if uncreated).
	Inputs   PropertyMap // the resource's input properties (as specified by the program).
	Defaults PropertyMap // the resource's default property values (if any, given by the provider).
	Outputs  PropertyMap // the resource's complete output state (as returned by the resource provider).
}

// NewState creates a new resource value from existing resource state information.
func NewState(t tokens.Type, urn URN, id ID, inputs PropertyMap, defaults PropertyMap, outputs PropertyMap) *State {
	contract.Assert(t != "")
	contract.Assert(inputs != nil)
	return &State{
		Type:     t,
		URN:      urn,
		ID:       id,
		Inputs:   inputs,
		Defaults: defaults,
		Outputs:  outputs,
	}
}

// All returns all resource state, including the inputs, defaults, and outputs, overlaid in that order.
func (s *State) All() PropertyMap {
	return s.AllInputs().Merge(s.Outputs)
}

// AllInputs returns just the resource state's inputs plus any defaults supplied by the provider.  This is to be used
// when diffing resource states that are entirely under the control of the developer, instead of a cloud provider.
func (s *State) AllInputs() PropertyMap {
	return s.Defaults.Merge(s.Inputs)
}

// Synthesized returns all of the resource's "synthesized" state; this includes all properties that appeared in the
// default and output set, which may or may not override some or all of those that appeared in the input set.
func (s *State) Synthesized() PropertyMap {
	return s.Defaults.Merge(s.Outputs)
}
