let vertexSource =
`#version 300 es

precision mediump float;

layout(location = 0)in vec2 aPosition;

void main() {
    gl_Position = vec4(aPosition, 0.0, 0.0);
}
`

let fragmentSource = 
`#version 300 es

#define INFINITY 3.4028237e38
#define NUM_OF_SPHERES 20
#define NUM_OF_LIGHTS 1

precision mediump float;

uniform vec2 windowSize;
uniform mat3 cameraMat;
uniform vec3 cameraPos;

out vec4 fragColor;

struct Ray {
    vec3 origin;
    vec3 direction;
};

struct Material {
    vec3 color;
    float shininess;
};

struct Intersection {
    bool isExist;
    vec3 position;
    vec3 normal;
    Material material;
};

struct Light {
    vec3 position;
    float align;
    vec3 color;
    float align1;
};

struct Sphere {
    vec3 position;
    float radius;
    Material material;
};

layout(std140) uniform Scene {
    Sphere spheres[NUM_OF_SPHERES];
    Light lights[NUM_OF_LIGHTS];
} scene;

void getIntersection(in Ray ray, out Intersection intersection) {
    float minDistance = INFINITY;

    for(int i = 0; i < NUM_OF_SPHERES; i++) {
        Sphere sphere = scene.spheres[i];
        float t = dot(sphere.position-ray.origin, ray.direction);
        
        if(t > 0.0) {
            vec3 p = ray.origin + ray.direction*t;
            float y = length(sphere.position-p);

            if(y < sphere.radius) {
                float x = sqrt(sphere.radius*sphere.radius - y*y);
                float t1 = t-x;
                
                if(t1<minDistance) {
                    minDistance = t1;
                    intersection.isExist = true;
                    intersection.position = ray.origin + ray.direction*t1;
                    intersection.normal = normalize(intersection.position - sphere.position);
                    intersection.material = sphere.material;
                }
            }
        }
    }
}

void main() {
    vec3 color = vec3(0.3);

    vec3 fragCoord = vec3((gl_FragCoord.xy-windowSize*0.5)/windowSize.xy, 0.0);
    fragCoord.x *= windowSize.x/windowSize.y;

    fragCoord.z += 3.0;
    fragCoord = cameraPos + (cameraMat*fragCoord);

    Ray ray; 
    Intersection intersections[2];

    ray.origin = cameraPos;
    ray.direction = normalize(fragCoord - ray.origin);

    getIntersection(ray, intersections[0]);

    if(intersections[0].isExist) {
        color = intersections[0].material.color;

        ray.origin = intersections[0].position;
        ray.direction = normalize(scene.lights[0].position - ray.origin);

        getIntersection(ray, intersections[1]);

        if(intersections[1].isExist) {
            color = vec3(0.0);
        }
    }

    fragColor = vec4(color, 1.0);
}
`