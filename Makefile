# Copyright 2019 The Caicloud Authors.
#
# The old school Makefile, following are required targets. The Makefile is written
# to allow building multiple images. You are free to add more targets or change
# existing implementations, as long as the semantics are preserved.
#
#   make              - default to 'build' target
#   make lint         - code analysis
#   make test         - run unit test (or plus integration test)
#   make build        - alias to build-local target
#   make build-local  - build code
#   make container    - build containers
#   $ docker login REGISTRY -u username -p xxxxx
#   make push         - push containers
#   make clean        - clean up targets
#
# The makefile is also responsible to populate project version information.
#

#
# Tweak the variables based on your project.
#

# Current version of the project.
VERSION ?= $(shell git describe --tags --always --dirty)

# Available cpus for compiling, please refer to https://github.com/caicloud/engineering/issues/8186#issuecomment-518656946 for more information.
CPUS ?= $(shell bash build/read_cpus_available.sh)

# Container REGISTRY.
REGISTRY ?= cargo.dev.caicloud.xyz/release

BUILD_ENV ?= local

# image prefix and suffix added to targets.
# The final built images are:
#   $[REGISTRY]/$[IMAGE_PREFIX]$[TARGET]$[IMAGE_SUFFIX]:$[VERSION]
# $[TARGET] is an item from $[TARGETS].
IMAGE_PREFIX ?= $(strip )
IMAGE_SUFFIX ?= $(strip )

#
# These variables should not need tweaking.
#

# Target images. You can build multiple images for a single project.
TARGETS := x-web

# Build direcotory.
BUILD_DIR := ./build

#
# Define all targets. At least the following commands are required:
#

# All targets.
.PHONY: build-local build container push

build-local:
	@for target in $(TARGETS); do                                                     \
	  bash -c 'set -ex &&                                                             \
	    yarn &&                                                                       \
	    CPUS=$(CPUS) yarn run build';                                                 \
	done

build: build-local

container: build-local
	@for target in $(TARGETS); do                                                     \
	  image=$(IMAGE_PREFIX)$${target}$(IMAGE_SUFFIX);                                 \
	  docker build -t $(REGISTRY)/$${image}:$(VERSION)                                \
	    -f $(BUILD_DIR)/$${target}/Dockerfile .;                                      \
	  if [ $(BUILD_ENV) == local ]; then                                              \
	    docker image prune --filter label="stage=web_cacher";                         \
	  fi                                                                              \
	done

push: container
	@for target in $(TARGETS); do                                                     \
	  image=$(IMAGE_PREFIX)$${target}$(IMAGE_SUFFIX);                                 \
	  docker push $(REGISTRY)/$${image}:$(VERSION);                                   \
	done
