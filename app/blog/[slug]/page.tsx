import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DifficultyBadge } from "@/components/difficulty-badge"
import { CodeBlock } from "@/components/code-block"
import { BlogHeader } from "@/components/blog-header"

// Sample blog post data - in a real app, this would come from a CMS or database
const blogPost = {
  id: "two-pointers-technique",
  title: "Mastering Two Pointers: Solving Array Problems Efficiently",
  content: `
The two-pointer technique is one of the most elegant and efficient approaches for solving array and string problems. This pattern involves using two pointers that traverse the data structure in a coordinated manner, often leading to optimal O(n) time complexity solutions.

## Understanding the Two-Pointer Pattern

The two-pointer technique works by maintaining two references (pointers) to elements in an array or string. These pointers can move:
- **Towards each other** (convergent approach)
- **In the same direction** (sliding window approach)
- **At different speeds** (fast and slow pointers)

## Classic Problem: Two Sum in Sorted Array

Let's start with a fundamental example. Given a sorted array and a target sum, find two numbers that add up to the target.

\`\`\`python
def two_sum_sorted(nums, target):
    """
    Find two numbers in a sorted array that sum to target.
    Time: O(n), Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return []  # No solution found

# Example usage
nums = [2, 7, 11, 15]
target = 9
result = two_sum_sorted(nums, target)
print(f"Indices: {result}")  # Output: [0, 1]
\`\`\`

The beauty of this approach lies in its simplicity and efficiency. By leveraging the sorted property, we can make intelligent decisions about which pointer to move.

## Advanced Example: Container With Most Water

Here's a more complex problem that demonstrates the power of two pointers:

\`\`\`javascript
function maxArea(height) {
    /**
     * Find the container that can hold the most water
     * Time: O(n), Space: O(1)
     */
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        // Calculate current area
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;
        
        maxWater = Math.max(maxWater, currentArea);
        
        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// Example
const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(heights)); // Output: 49
\`\`\`

## Key Insights and Best Practices

### When to Use Two Pointers

1. **Sorted arrays or strings** - The sorted property enables intelligent pointer movement
2. **Finding pairs or triplets** - Especially when looking for specific sums
3. **Palindrome problems** - Compare characters from both ends
4. **Removing duplicates** - Maintain unique elements efficiently

### Common Patterns

\`\`\`cpp
// Pattern 1: Convergent pointers
int left = 0, right = n - 1;
while (left < right) {
    // Process current pair
    if (condition) {
        left++;
    } else {
        right--;
    }
}

// Pattern 2: Same direction (sliding window)
int slow = 0, fast = 0;
while (fast < n) {
    // Expand window
    fast++;
    
    // Contract window if needed
    while (window_invalid) {
        slow++;
    }
}
\`\`\`

## Time and Space Complexity

The two-pointer technique typically achieves:
- **Time Complexity**: O(n) - single pass through the data
- **Space Complexity**: O(1) - only using two pointer variables

This is a significant improvement over brute force O(n²) approaches that check all pairs.

## Practice Problems

To master this technique, try solving these problems:

1. **Remove Duplicates from Sorted Array**
2. **Valid Palindrome**
3. **3Sum Problem**
4. **Trapping Rain Water**
5. **Sort Colors (Dutch National Flag)**

Each problem will help you recognize different variations of the two-pointer pattern and build your intuition for when to apply this technique.

## Conclusion

The two-pointer technique is a fundamental algorithmic pattern that every programmer should master. Its elegance lies in transforming complex O(n²) problems into efficient O(n) solutions through clever pointer manipulation. Practice with various problems to develop the intuition for recognizing when this pattern applies.
  `,
  difficulty: "Easy" as const,
  category: "Arrays & Strings",
  tags: ["Two Pointers", "Arrays", "Optimization"],
  author: "Sarah Chen",
  readTime: "8 min read",
  publishedAt: "2024-01-15",
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with back navigation */}
      <BlogHeader />

      {/* Back navigation bar */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-3">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Article content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <DifficultyBadge difficulty={blogPost.difficulty} />
            {/* Apply orange styling to all categories */}
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700/50 dark:hover:bg-orange-900/50">
              {blogPost.category}
            </Badge>
            {blogPost.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-muted-foreground/30 hover:bg-slate-400 hover:text-slate-900 bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:hover:text-slate-100"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">{blogPost.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article body */}
        <div className="prose prose-lg max-w-none">
          <CodeBlock content={blogPost.content} />
        </div>

        {/* Article footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Tags:</span>
            {blogPost.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs border-muted-foreground/30 text-foreground hover:bg-slate-400 hover:text-slate-900 dark:hover:bg-slate-600 dark:hover:text-slate-100"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </footer>
      </article>
    </div>
  )
}
